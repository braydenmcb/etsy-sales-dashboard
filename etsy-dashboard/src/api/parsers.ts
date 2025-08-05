import Papa from "papaparse";

export function parseSoldOrders(csvText: string): Promise<any[]> {
    console.log("parsing: sold orders");
    return new Promise((resolve) => { 
        Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const parsed = results.data.map((row: any) => ({
                    orderId: row["Order ID"],
                    saleDate: row["Sale Date"],
                    orderTotal: parseFloat(row["Order Total"] || "0"),
                    shipCountry: row["Ship Country"],
                    shipState: row["Ship State"],
                    shipCity: row["Ship City"],
                }));
                resolve(parsed);
            },
        });
    });
}

export function parseSoldOrderItems(csvText: string): Promise<any[]> {
    console.log("parsing: sold order items");
    return new Promise((resolve) => { 
        Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const parsed = results.data.map((row: any) => ({
                    orderId: row["Order ID"],
                    itemName: row["item Name"],
                    sku: row["SKU"],
                    quantity: parseInt(row["Quantity"] || "0"),
                    price: parseFloat(row["Price"] || "0"),
                    couponCode: row["Coupon Code"],
                    discountAmount: parseFloat(row["Discount Amount"] || "0"),
                    itemTotal: parseFloat(row["Item Total"] || "0"),
                    currency: row["Currency"]                   
                }));
                resolve(parsed);
            },
        });
    });
}