<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\GuestUser;
use Illuminate\Support\Str;
class GuestTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    // Create admin user
    GuestUser::create([
      'guest_id' => Str::uuid(),
    ]);
  }
}
