<?php

declare(strict_types=1);

namespace App\Http\Services;

use App\Http\Repositories\FavoriteRepository;

class FavoriteService
{
  private $favoriteRepo;

  public function __construct(FavoriteRepository $favoriteRepo)
  {
    $this->favoriteRepo = $favoriteRepo;
  }

  public function create($params)
  {
    return $this->favoriteRepo->create($params);
  }

  // public function getDetailFavorite($user_id)
  // {
  //   return $this->favoriteRepo->getDetailFavorite($user_id);
  // }

  public function delete($favorite_id)
  {
    return $this->favoriteRepo->delete($favorite_id);
  }

  public function getList($params)
  {
    $response = $this->favoriteRepo->getList($params);
    $favorites = $response['data'];

    $data['data'] = $favorites->map(function ($item) {
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

    $data['total'] = $response['total'];
    $data['per_page'] = $response['per_page'];
    $data['current_page'] = $response['current_page'];

    return $data;
  }
}

