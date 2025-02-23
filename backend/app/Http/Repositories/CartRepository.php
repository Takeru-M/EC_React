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

  public function update($cart_id, $params)
  {
    $data = Cart::where('id', $cart_id)->first();
    $data->update($params);
    return $data->refresh();
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

  public function fetchCarts($params)
  {
    $page = (int) $params['page'];
    $page_size = (int) $params['page_size'];

    $query = Cart::query();

    $query->where('user_id', $params['user_id'])
      ->with('product');

    $total = $query->count();
    $data = $query->skip(($page - 1) * $page_size)->take($page_size)->get();

    return [
      'data' => $data,
      'total' => $total,
      'per_page' => $page_size,
      'current_page' => $page,
    ];
  }
}
