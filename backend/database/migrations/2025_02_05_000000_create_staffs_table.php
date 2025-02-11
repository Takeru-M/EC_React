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
    Schema::create('staffs', function (Blueprint $table) {
      $table->id();
      $table->string('first_name');
      $table->string('last_name');
      $table->string('first_name_kana');
      $table->string('last_name_kana');
      $table->string('email')->unique();
      $table->string('phone_number')->unique();
      $table->string('postal_code');
      $table->string('address');
      $table->string('password');
      $table->unsignedBigInteger('created_by');
      $table->unsignedBigInteger('updated_by')->nullable();
      $table->unsignedBigInteger('deleted_by')->nullable();
      $table->boolean('exist')->default(true);
      $table->timestamps();
      $table->softDeletes();

      $table->unique(['email', 'phone_number']);

      // Self-referencing foreign key for created_by
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
    Schema::dropIfExists('staffs');
  }
};
