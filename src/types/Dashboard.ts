
export type Dashboard = {
    total_product_categories: number
    total_products: number
    total_orders_per_month: number
    total_income_per_month: number
    total_orders_all: number
    total_income_all: number
}

export type DashboardState = {
    dashboard: Dashboard
}
export type DashboardAction = {
    getDashboard: () => void
}