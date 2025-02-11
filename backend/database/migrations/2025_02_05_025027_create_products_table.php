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
    Schema::create('products', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->text('description');
      $table->integer('price');
      $table->integer('stock');
      $table->string('image');
      $table->float('rating')->default(0);
      $table->unsignedBigInteger('created_by')->nullable();
      $table->unsignedBigInteger('updated_by')->nullable();
      $table->unsignedBigInteger('deleted_by')->nullable();
      $table->boolean('exist')->default(true);
      $table->timestamps();
      $table->softDeletes();

      $table->foreign('created_by')
        ->references('id')
        ->on('staffs');

      $table->foreign('updated_by')
        ->references('id')
        ->on('staffs');

      $table->foreign('deleted_by')
        ->references('id')
        ->on('staffs');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('products');
  }
};
