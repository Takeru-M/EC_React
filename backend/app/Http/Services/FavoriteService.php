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

  public function getList($user_id)
  {
    return $this->favoriteRepo->getList($user_id);
  }

  public function create($params)
  {
    return $this->favoriteRepo->create($params);
  }

  // public function getDetailFavorite($user_id)
  // {
  //   return $this->favoriteRepo->getDetailFavorite($user_id);
  // }

  public function delete($params)
  {
    return $this->favoriteRepo->delete($params);
  }
}
