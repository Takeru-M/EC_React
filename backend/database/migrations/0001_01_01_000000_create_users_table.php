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
    Schema::create('users', function (Blueprint $table) {
      $table->id();
      $table->string('login_name')->unique();
      $table->string('first_name');
      $table->string('last_name');
      $table->string('first_name_kana');
      $table->string('last_name_kana');
      $table->string('email')->unique();
      $table->string('phone_number')->unique();
      $table->string('postal_code');
      $table->string('address');
      $table->string('password');
      $table->boolean('exist')->default(true);
      $table->timestamps();
      $table->softDeletes();

      $table->unique(['email', 'phone_number']);
    });

    Schema::create('password_reset_tokens', function (Blueprint $table) {
      $table->string('email')->primary();
      $table->string('token');
      $table->timestamp('created_at')->nullable();
    });

    Schema::create('sessions', function (Blueprint $table) {
      $table->string('id')->primary();
      $table->foreignId('user_id')->nullable()->index();
      $table->string('ip_address', 45)->nullable();
      $table->text('user_agent')->nullable();
      $table->longText('payload');
      $table->integer('last_activity')->index();
    });

  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('favorites');
    Schema::dropIfExists('carts');
    Schema::dropIfExists('shipping_addresses');
    Schema::dropIfExists('users');
    Schema::dropIfExists('password_reset_tokens');
    Schema::dropIfExists('sessions');
  }
};
