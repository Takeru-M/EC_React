<?php

namespace Database\Seeders;

use App\Models\Review;
use Illuminate\Database\Seeder;

class ReviewTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    Review::create([
      'user_id' => 1,
      'product_id' => 1,
      'rating' => 4.5,
      'comment' => 'This is a great product!',
    ]);
  }
}
