<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\Staff;
use Illuminate\Support\Facades\Hash;
use App\Constants\RoleConst;

class StaffsTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    // Create admin staff
    $admin = Staff::create([
      'first_name' => '管理者',
      'last_name' => '太郎',
      'first_name_kana' => 'カンリシャ',
      'last_name_kana' => 'タロウ',
      'email' => 'admin@staff.com',
      'phone_number' => '09011111111',
      'postal_code' => '1000001',
      'address' => '東京都千代田区千代田1-1',
      'password' => Hash::make('password'),
      'created_by' => 1,
      'exist' => true,
    ]);
    $admin->assignRole(Role::findByName(RoleConst::ADMIN_ROLE, 'staff'));

    // Create manager staff
    $manager = Staff::create([
      'first_name' => '店長',
      'last_name' => '次郎',
      'first_name_kana' => 'テンチョウ',
      'last_name_kana' => 'ジロウ',
      'email' => 'manager@staff.com',
      'phone_number' => '09022222222',
      'postal_code' => '1000002',
      'address' => '東京都千代田区千代田1-2',
      'password' => Hash::make('password'),
      'created_by' => $admin->id,
      'exist' => true,
    ]);
    $manager->assignRole(Role::findByName(RoleConst::MANAGER_ROLE, 'staff'));

    // Create employee staff
    $staff = Staff::create([
      'first_name' => '社員',
      'last_name' => '三郎',
      'first_name_kana' => 'シャイン',
      'last_name_kana' => 'サブロウ',
      'email' => 'employee@staff.com',
      'phone_number' => '09033333333',
      'postal_code' => '1000003',
      'address' => '東京都千代田区千代田1-3',
      'password' => Hash::make('password'),
      'created_by' => $manager->id,
      'exist' => true,
    ]);
    $staff->assignRole(Role::findByName(RoleConst::EMPLOYEE_ROLE, 'staff'));
  }
}
