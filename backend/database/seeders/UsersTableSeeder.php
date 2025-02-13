<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Constants\RoleConst;

class UsersTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    // Create admin user
    $admin = User::create([
      'login_name' => 'sample',
      'first_name' => 'サンプル',
      'last_name' => 'サンプル',
      'first_name_kana' => 'サンプル',
      'last_name_kana' => 'サンプル',
      'email' => 'sample@example.com',
      'phone_number' => '09012345678',
      'postal_code' => '1234567',
      'address' => 'Tokyo, Japan',
      'password' => Hash::make('password'),
      'exist' => true,
    ]);
  }
}
