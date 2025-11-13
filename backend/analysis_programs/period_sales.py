import pandas as pd

'''
TODO: make the average sales per period
This program analyzes the total amount of orders, items, and income
based on a specific time period.
'''
def average_sales(yearly_df, monthly_df, weekly_df):
    """
    calculates the average sales per specified time period
    """
    avg_per_year = float((yearly_df["total"].sum() / yearly_df["year"].count()).round(2))
    avg_per_month = float((monthly_df["total"].sum() / monthly_df["month"].count()).round(2))
    avg_per_week = float((weekly_df["total"].sum() / weekly_df["iso_week"].count()).round(2))
    avg_per_day = float((weekly_df["total"].sum() / (weekly_df["iso_week"].count()* 7)).round(2))

    averages_json = {
        "average_per_year": avg_per_year,
        "average_per_month": avg_per_month,
        "average_per_week": avg_per_week,
        "average_per_day": avg_per_day
    }

    return averages_json


def aggregate_period(df, period="yearly"):
    """
    """
    if period == "yearly":
        group_cols = ["year"]
        sort_cols = ["year"]
    elif period == "monthly":
        group_cols = ["year", "month"]
        sort_cols = ["year", "month"]
    elif period == "weekly":
        group_cols = ["iso_year", "iso_week", "week_start"]
        sort_cols = ["iso_year", "iso_week"]

    result = (
            df.groupby(group_cols)
            .agg(
                orders=("orderId", "nunique"),
                items=("quantity", "sum"),
                total=("itemTotal", "sum")
            )
            .reset_index()
        )
    
    if period == "weekly": # convert weekly data to date string (remove the timestamp)
        result["week_start"] = result["week_start"].dt.strftime("%Y-%m-%d")

    result = result.sort_values(by=sort_cols, ascending=[True] * len(sort_cols))
    result["total"] = result["total"].round(2)

    result_json = result.to_dict(orient="records")
    # print(result_json)
    return result_json, result

    
def analyze(csv_path="../uploads/MergedOrderItems.csv"):
    """
    creates a Pandas DataFrame of the csv file, and organizes the data into time periods,
    then calls aggregate_sales() to aggregate the data and then forms a final JSON to send back
    to the frontend
    """
    df = pd.read_csv(csv_path, parse_dates=["saleDate"], date_format="%m/%d/%y")
    df["year"] = df["saleDate"].dt.year
    df["month"] = df["saleDate"].dt.month

    # iso values for weekly aggregation
    df["iso_year"] = df["saleDate"].dt.isocalendar().year
    df["iso_week"] = df["saleDate"].dt.isocalendar().week
    df["week_start"] = df["saleDate"] - pd.to_timedelta(df["saleDate"].dt.weekday, unit="d")


    orders = df.groupby(["orderId", "year", "month", "iso_year", "iso_week", "week_start"], as_index=False).agg({
        "quantity": "sum",
        "itemTotal": "sum"
    })

    yearly_json, yearly_df = aggregate_period(orders, "yearly")
    monthly_json, monthly_df = aggregate_period(orders, "monthly")
    weekly_json, weekly_df = aggregate_period(orders, "weekly")

    totals_json = {
        "yearly_sales": yearly_json,
        "monthly_sales": monthly_json,
        "weekly_sales": weekly_json
    }

    # average data
    averages_json = average_sales(yearly_df, monthly_df, weekly_df)
    
    final_json = {
        "totals": totals_json,
        "averages": averages_json
    }

    return final_json


def main(csv_path="../uploads/MergedOrderItems.csv"):
    """CLI entrypoint for testing"""
    final_json = analyze(csv_path)
    print(final_json)

if __name__ == "__main__":
    main("../uploads/MergedOrderItems.csv")