<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('categories', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    // Drop dependent tables first
    Schema::dropIfExists('ordered_items');
    Schema::dropIfExists('orders');
    Schema::dropIfExists('carts');
    Schema::dropIfExists('products');  // Drop products before categories
    Schema::dropIfExists('categories');
  }
};
