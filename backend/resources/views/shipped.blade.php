<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin: auto;
        }
        .header {
            text-align: center;
            padding: 10px 0;
            border-bottom: 2px solid #007bff;
        }
        .header h1 {
            margin: 0;
            color: #333;
        }
        .content {
            padding: 20px 0;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            color: #555;
        }
        .order-details {
            margin-top: 20px;
            border-top: 2px solid #ddd;
            padding-top: 10px;
        }
        .order-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        .total {
            font-size: 18px;
            font-weight: bold;
            text-align: right;
            margin-top: 10px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
        .footer a {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>

<!-- order, order_item -->
<div class="container">
    <!-- ヘッダー -->
    <div class="header">
        <h1>Thank You for Your Order!</h1>
    </div>

    <!-- 注文内容 -->
    <div class="content">
        <p>Dear {{ $order['name'] }},</p>
        <p>We are pleased to confirm your order.</p>
    </div>

    <!-- 商品リスト -->
    <div class="order-details">
        <h3>Order Details</h3>
        @foreach ($orderDetails['items'] as $item)
            <div class="order-item">
                <span>{{ $item['name'] }} (x{{ $item['quantity'] }})</span>
                <span>${{ number_format($item['price'] * $item['quantity'], 2) }}</span>
            </div>
        @endforeach
        <div class="total">
            Total: ${{ number_format($orderDetails['total'], 2) }}
        </div>
    </div>

    <!-- フッター -->
    <div class="footer">
        <p>If you have any questions, please contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
        <p>Thank you for shopping with us!</p>
    </div>
</div>

</body>
</html>
