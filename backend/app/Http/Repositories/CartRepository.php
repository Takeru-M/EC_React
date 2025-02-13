<?php

declare(strict_types=1);

namespace App\Http\Repositories;

use App\Models\Cart;

class CartRepository
{
  public function getAllCarts()
  {
    return Cart::all();
  }

  public function getList($user_id)
  {
    return Cart::where('user_id', $user_id)
      ->orderBy('created_at', 'desc')
      ->get();
  }

  public function create($params)
  {
    return Cart::create($params);
  }

  // public function getDetailCart($id)
  // {
  //   return Cart::where('id', $id)
  //     ->where('exist', true)
  //     ->first();
  // }

  public function delete($cart_id)
  {
    $data = Cart::where('id', $cart_id)
      ->first();

    $data->delete();

    return $data;
  }

  public function getCarts($user_id)
  {
    return Cart::where('user_id', $user_id)
      ->with('product')
      ->get()
      ->map(function ($item) {
        return [
          'id' => $item->id,
          'quantity' => $item->quantity,
          'created_at' => $item->created_at,
          'updated_at' => $item->updated_at,
          'product' => [
            'id' => $item->product->id,
            'name' => $item->product->name,
            'price' => $item->product->price,
            'stock' => $item->product->stock,
            'image' => $item->product->image,
          ],
          'total_price' => $item->product->price * $item->quantity
        ];
      });
  }
}
