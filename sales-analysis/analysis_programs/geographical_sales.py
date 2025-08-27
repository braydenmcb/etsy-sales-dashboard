import pandas as pd
'''
This program analyzes geographical sales data by aggregating all orders and sorting them based on 
country, state/province, city to be sent to the frontend in order to be visualized on a map, tracks orders
and items ordered to the respective locations
'''

def group_by_country(df, field_tracking):
    """aggregates orders/items ordered by country, state/province, city"""
    
    result = []
    for country, country_df in df.groupby("shipCountry"):
        country_entry = {
            "country": country,
            field_tracking: int(country_df[field_tracking].sum()),
            "states": []
        }
        for state, state_df in country_df.groupby("shipState"):
            state_entry = {
                "state": state,
                field_tracking: int(state_df[field_tracking].sum()),
                "cities": state_df[["shipCity", field_tracking]].to_dict(orient="records")
            }
            country_entry["states"].append(state_entry)
        result.append(country_entry)
    
    return result


def analyze(csv_path="../uploads/MergedOrderItems.csv"):
    """ builds the dataframes, calls the helper function to make the JSON
        and returns the final JSON for the completed geo analysis """
    
    df = pd.read_csv(csv_path)
    
    order_items = (
        df.groupby(["shipCountry", "shipState", "shipCity"])
        .size()
        .reset_index(name="items_ordered")
    )

    orders = (
        df.groupby(["shipCountry", "shipState", "shipCity"])["orderId"]
        .nunique()
        .reset_index(name="orders")
    )

    orders_json = group_by_country(orders, "orders")
    items_ordered_json = group_by_country(order_items, "items_ordered")

    final_json = {
        "geographical_orders": orders_json,
        "geographical_items_ordered": items_ordered_json
    }

    return final_json


def main(csv_path="../uploads/MergedOrderItems.csv"):
    """CLI entrypoint for testing"""
    final_json = analyze(csv_path)
    print(final_json)


if __name__ == "__main__":
    main("../uploads/MergedOrderItems.csv")