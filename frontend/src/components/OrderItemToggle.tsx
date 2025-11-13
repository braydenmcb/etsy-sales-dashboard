import React from 'react';
import Form from 'react-bootstrap/Form';

interface Props {
    mode: "orders" | "items";
    onToggle: (newMode: "orders" | "items") => void;
}

const OrderItemToggle: React.FC<Props> = ({ mode, onToggle }) => {
    return (
        <div className="d-flex justify-content-center my-3 align-items-center">
            <span className={mode === "orders" ? "fw-bold" : ""}>Orders</span>
            <Form.Check
                type="switch"
                id="order-item-switch"
                className="mx-2"
                checked={mode === "items"}
                onChange={() => onToggle(mode === "orders" ? "items" : "orders")}
            />
            <span className={mode === "items" ? "fw-bold" : ""}>Items</span>
        </div>
    )
}

export default OrderItemToggle;