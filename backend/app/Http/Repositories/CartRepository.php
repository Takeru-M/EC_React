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
    $page = (int) ($params['page']);
    $page_size = (int) ($params['page_size']);
    $user_id = $params['user_id'];

    $query = Cart::where('user_id', $user_id)
      ->with('product')
      ->orderBy('created_at', 'desc');

    $total = $query->count();
    $data = $query->skip(($page - 1) * $page_size)
      ->take($page_size)
      ->get();

    return [
      'data' => $data,
      'total' => $total,
      'per_page' => $page_size,
      'current_page' => $page,
    ];
  }

  public function fetchCartsForGuest($params)
  {
    $page = (int) $params['page'];
    $page_size = (int) $params['page_size'];
    $guest_id = $params['guest_id'] ?? null;

    if (!$guest_id) {
      return [
        'data' => [],
        'total' => 0,
        'per_page' => $page_size,
        'current_page' => $page,
      ];
    }

    $query = Cart::query();

    $query->where('guest_id', $guest_id)
      ->whereNotNull('guest_id')
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

  public function createForGuest($params)
  {
    return Cart::create($params);
  }

  public function integrateCart($params)
  {
    // First, get all guest carts
    $guestCarts = Cart::where('guest_id', $params['guest_id'])->get();

    foreach ($guestCarts as $guestCart) {
      // Check if user already has this product in cart
      $existingCart = Cart::where('user_id', $params['user_id'])
        ->where('product_id', $guestCart->product_id)
        ->first();

      if ($existingCart) {
        // Update quantity if product already exists
        $existingCart->update([
          'quantity' => $existingCart->quantity + $guestCart->quantity
        ]);
        // Delete guest cart
        $guestCart->delete();
      } else {
        // Just update the cart ownership
        $guestCart->update([
          'user_id' => $params['user_id'],
          'guest_id' => null
        ]);
      }
    }

    return true;
  }
}
