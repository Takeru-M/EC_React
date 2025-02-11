<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use App\Models\CategoryItem;

class CategoryItemTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all products and categories
        $products = Product::all();
        $categories = Category::all();

        // For each product, create unique category items
        foreach ($products as $product) {
          // ランダムなカテゴリ数を決定（最大カテゴリー数を超えないようにする）
          $randomNumOfCategories = rand(1, min(3, $categories->count()));

          // 重複なしでランダムにカテゴリを選択
          $randomCategories = $categories->random($randomNumOfCategories);

          foreach ($randomCategories as $category) {
              CategoryItem::create([
                  'product_id' => $product->id,
                  'category_id' => $category->id,
              ]);
          }
        }
    }
}
