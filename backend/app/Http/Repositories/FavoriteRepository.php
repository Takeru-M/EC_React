<?php

declare(strict_types=1);

namespace App\Http\Repositories;

use App\Models\Favorite;

class FavoriteRepository
{
  public function getAllFavorites()
  {
    return Favorite::all();
  }

  public function getList($user_id)
  {
    return Favorite::where('user_id', $user_id)
      ->with('product')
      ->get()
      ->map(function ($item) {
        return [
          'id' => $item->id,
          'created_at' => $item->created_at,
          'updated_at' => $item->updated_at,
          'product' => [
            'id' => $item->product->id,
            'name' => $item->product->name,
            'price' => $item->product->price,
            'stock' => $item->product->stock,
            'image' => $item->product->image,
          ],
        ];
      });
  }

  public function create($params)
  {
    return Favorite::create($params);
  }

  // public function getDetailFavorite($user_id)
  // {
  //   return Favorite::where('user_id', $user_id)
  //     ->where('exist', true)
  //     ->first();
  // }fav

  public function delete($favorite_id)
  {
    $data = Favorite::where('id', $favorite_id)->first();
    $data->delete();

    return $data;
  }
}
