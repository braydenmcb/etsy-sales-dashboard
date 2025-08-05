import { sendDataToBackend } from "../api/sendData";
import { parseSoldOrders, parseSoldOrderItems } from "../api/parsers"

type ParsedFiles = {
    orders: any[] | null;
    items: any[] | null;
};

export function fetchCsvData(files: File[]): void {
    console.log("fetching data")
    const parsed: ParsedFiles = {
        orders: null,
        items: null,
    };

    let filesParsed = 0;

    Array.from(files).forEach((file) => {
        const reader = new FileReader();

        reader.onload = async () => {
            const text = reader.result as string;
            
            if (file.name.includes("EtsySoldOrders")) {
                parsed.orders = await parseSoldOrders(text);
            } else if (file.name.includes("EtsySoldOrderItems")) {
                parsed.items = await parseSoldOrderItems(text);
            }

            filesParsed++;
            if(filesParsed === files.length && parsed.orders && parsed.items) {
                const merged = mergeOrdersAndItems(parsed.orders, parsed.items);
                sendDataToBackend({filename: "MergedOrders.csv", content: merged});
            }
        };
        reader.readAsText(file);
    });
}

function mergeOrdersAndItems(orders: any[], items: any[]) {
    const merged = [];

    for (const order of orders) {
        const itemsForOrder = items.filter((item) => item.orderId === order.orderId);
        for (const item of itemsForOrder) {
            merged.push({ ...order, ...item });
        }
    }

    return merged;
}