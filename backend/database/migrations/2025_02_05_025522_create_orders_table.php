<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable()->default(null);
            $table->unsignedBigInteger('guest_id')->nullable()->default(null);
            $table->string('name');
            $table->string('address');
            $table->string('postal_code');
            $table->string('email');
            $table->string('phone_number');
            $table->string('shipping_fee');
            $table->string('total_price');
            // $table->string('payment_method');
            $table->integer('status');
            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')
                ->on('users');

            $table->foreign('guest_id')
                ->references('id')
                ->on('guest_users');

            // TODO: ユーザーとゲストユーザーの両方が存在しない場合はエラー
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
