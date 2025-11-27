<?php

declare(strict_types=1);

namespace App\Http\Repositories;

use App\Models\Order;
use App\Models\OrderedItem;
use Illuminate\Support\Facades\DB;

class OrderRepository
{
  public function create($params)
  {
    $order = Order::create($params);
    return $order;
  }

  public function createOrderedItems($params)
  {
    try {
        $orderId = $params['order_id'];
        $products = $params['products'];

        foreach ($products as $product) {
            OrderedItem::create([
                'order_id' => $orderId,
                'product_id' => $product['product_id'],
                'name' => $product['name'],
                'price' => $product['price'],
                'quantity' => $product['quantity'],
            ]);
        }

        return true;
    } catch (\Exception $e) {
        DB::rollBack();

        return false;
    }
  }
}
