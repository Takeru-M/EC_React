<?php

declare(strict_types=1);

namespace App\Http\Repositories;

use App\Models\Review;
use App\Constants\Constant;

class ReviewRepository
{
  public function getAllReviews()
  {
    return Review::all();
  }

  public function getList($product_id)
  {
    return Review::where('product_id', $product_id)
      ->orderBy('created_at', 'desc')
      ->take(Constant::DEFAULT_REVIEW_PAGE_SIZE)
      ->get();
  }

  public function create($params)
  {
    return Review::create($params);
  }

  public function getDetailReview($id)
  {
    return Review::where('id', $id)->first();
  }

  public function update($params, $id)
  {
    return Review::where('id', $id)->update($params);
  }

  public function delete($id)
  {
    return Review::where('id', $id)->delete();
  }

  public function getAllList($product_id)
  {
    return Review::where('product_id', $product_id)
      ->orderBy('created_at', 'desc')
      ->get();
  }

  public function getReviewsWithUserNames($product_id)
  {
      return Review::select(
          'reviews.id',
          'reviews.user_id',
          'reviews.product_id',
          'reviews.rating',
          'reviews.comment',
          'reviews.created_at',
          'reviews.updated_at',
          'users.login_name as user_login_name'
      )
      ->join('users', 'reviews.user_id', '=', 'users.id')
      ->where('reviews.product_id', $product_id)
      ->orderBy('reviews.created_at', 'desc')
      ->take(Constant::DEFAULT_REVIEW_PAGE_SIZE)
      ->get();
  }

  public function getAllReviewsWithUserNames($product_id)
  {
      return Review::select(
          'reviews.id',
          'reviews.user_id',
          'reviews.product_id',
          'reviews.rating',
          'reviews.comment',
          'reviews.created_at',
          'reviews.updated_at',
          'users.login_name as user_login_name'
      )
      ->join('users', 'reviews.user_id', '=', 'users.id')
      ->where('reviews.product_id', $product_id)
      ->orderBy('reviews.created_at', 'desc')
      ->get();
  }
}
