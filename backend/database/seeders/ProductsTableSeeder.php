<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductsTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $products = [
      [
        'name' => 'Classic T-Shirt',
        'description' => 'A comfortable cotton t-shirt for everyday wear',
        'price' => 2500,
        'stock' => 100,
        'image' => 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
        'rating' => 4.5,
        'created_by' => 1,
        'exist' => true
      ],
      [
        'name' => 'Premium Denim Jeans',
        'description' => 'High-quality denim jeans with perfect fit',
        'price' => 8500,
        'stock' => 75,
        'image' => 'https://images.unsplash.com/photo-1542272604-787c3835535d',
        'rating' => 4.8,
        'created_by' => 1,
        'exist' => true
      ],
      [
        'name' => 'Leather Wallet',
        'description' => 'Genuine leather wallet with multiple card slots',
        'price' => 5000,
        'stock' => 150,
        'image' => 'https://images.unsplash.com/photo-1627123424574-724758594e93',
        'rating' => 4.3,
        'created_by' => 1,
        'exist' => true
      ],
      [
        'name' => 'Running Shoes',
        'description' => 'Lightweight running shoes with cushioned soles',
        'price' => 12000,
        'stock' => 60,
        'image' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        'rating' => 4.6,
        'created_by' => 1,
        'exist' => true
      ],
      [
        'name' => 'Backpack',
        'description' => 'Durable backpack with laptop compartment',
        'price' => 6000,
        'stock' => 90,
        'image' => 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
        'rating' => 4.4,
        'created_by' => 1,
        'exist' => true
      ]
    ];

    foreach ($products as $product) {
      Product::create($product);
    }
  }
}
