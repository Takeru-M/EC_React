<?php

declare(strict_types=1);

namespace App\Http\Services;

use App\Http\Repositories\ReviewRepository;
use App\Models\Product;

class ReviewService
{
  private $reviewRepo;

  public function __construct(ReviewRepository $reviewRepo)
  {
    $this->reviewRepo = $reviewRepo;
  }

  public function getList($product_id)
  {
    return $this->reviewRepo->getList($product_id);
  }

  public function create($params)
  {
    return $this->reviewRepo->create($params);
  }

  public function getDetailUser($id)
  {
    return $this->reviewRepo->getDetailReview($id);
  }

  public function delete($params)
  {
    return $this->reviewRepo->delete($params);
  }

  public function getReviewsWithUserNames($product_id)
  {
    return $this->reviewRepo->getReviewsWithUserNames($product_id);
  }
}
