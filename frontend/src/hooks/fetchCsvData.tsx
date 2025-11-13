import { sendDataToBackend } from "../api/sendData";
import { parseSoldOrders, parseSoldOrderItems } from "../api/parsers"

type ParsedFiles = {
    orders: any[];
    items: any[];
};

export function fetchCsvData(files: File[]): void {
    console.log("fetching data")
    const parsed: ParsedFiles = {
        orders: [],
        items: [],
    };

    let filesParsed = 0;

    Array.from(files).forEach((file) => {
        const reader = new FileReader();

        reader.onload = async () => {
            const text = reader.result as string;
            
            if (file.name.includes("EtsySoldOrders")) {
                const year = file.name.match(/\d{4}/)?.[0] || "";
                const orders = await parseSoldOrders(text);

                parsed.orders.push(
                    ...orders.map(order => ({
                        ...order,
                        orderId: year ? `${year}-${order.orderId}` : order.orderId
                    }))
                );

            } else if (file.name.includes("EtsySoldOrderItems")) {
                const year = file.name.match(/\d{4}/)?.[0] || "";
                const items = await parseSoldOrderItems(text);
                
                parsed.items.push(
                    ...items.map(item => ({
                        ...item,
                        orderId: year ? `${year}-${item.orderId}` : item.orderId
                    }))
                );
            }

            filesParsed++;
            if(filesParsed === files.length && parsed.orders && parsed.items) {
                const merged = mergeOrdersAndItems(parsed.orders, parsed.items);
                sendDataToBackend({filename: "MergedOrderItems.csv", content: merged});
            }
        };
        reader.readAsText(file);
    });
}

function mergeOrdersAndItems(orders: any[], items: any[]) {
    // NOTE: there are no duplicate rows as some orders could be 
    //       personaliszed differently, making them different order items
    const merged = [];

    for (const order of orders) {
        const itemsForOrder = items.filter((item) => item.orderId === order.orderId);
        for (const item of itemsForOrder) {
            merged.push({ ...order, ...item });
        }
    }

    return merged;
}