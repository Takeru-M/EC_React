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

  public function delete($params)
  {
    $data = Cart::where('user_id', $params['user_id'])
      ->where('product_id', $params['product_id'])
      ->first();

    $data->delete();

    return $data;
  }
}
