import pandas as pd
import numpy as np


'''
TODO: see if you can change the format of the json so its not too long (have it nested or soemthing")
This program analyzes sales of specific items sold by the Etsy store,
and sorts them based on time periods.
'''
    
def aggregate_sales(df, period="yearly"):
    """
    aggregates the sales of each item based on a specified period,
    returns the result as a JSON
    """
    if period == "yearly":
        group_cols = ["itemName", "year"]
        sort_cols = ["year", "itemName"]
    elif period == "monthly":
        group_cols = ["itemName", "year", "month"]
        sort_cols = ["year", "month", "itemName"]
    elif period == "weekly":
        group_cols = ["itemName", "year", "week"]
        sort_cols = ["year", "week", "itemName"]

    result = (
        df.groupby(group_cols)
        .agg({"quantity": "sum", "itemTotal": "sum"})
        .reset_index()
    )

    result = result.sort_values(by=sort_cols, ascending=[True] * len(sort_cols))
    result["itemTotal"] = result["itemTotal"].round(2)

    result_json = result.to_dict(orient="records")
    # print(result)
    return result_json


def analyze(csv_path="../uploads/MergedOrderItems.csv"):
    """
    creates a pandas DataFrame of the csv file, then adds needed time columns.
    Then calls aggregate_sales() to aggregate the data and then forms final JSON to
    send back to frontend
    """
    df = pd.read_csv(csv_path, parse_dates=["saleDate"], date_format="%m/%d/%y")
    df["year"] = df["saleDate"].dt.year
    df["month"] = df["saleDate"].dt.month
    df["week"] = df["saleDate"].dt.isocalendar().week

    yearly_json = aggregate_sales(df, "yearly")
    monthly_json = aggregate_sales(df, "monthly")
    weekly_json = aggregate_sales(df, "weekly")

    final_json = {
        "yearly_items": yearly_json,
        "monthly_items": monthly_json,
        "weekly_items": weekly_json
    }

    return final_json


def main(csv_path="../uploads/MergedOrderItems.csv"):
    """CLI entrypoint for testing"""
    final_json = analyze(csv_path)
    # print(final_json)

if __name__ == "__main__":
    main("../uploads/MergedOrderItems.csv")