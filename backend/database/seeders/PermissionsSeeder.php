<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\Staff;
use App\Constants\RoleConst;
use App\Constants\PermissionConst;

class PermissionsSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    // ロールを作成
    $adminRole = Role::create(['name' => RoleConst::ADMIN_ROLE, 'guard_name' => 'staff']);
    $managerRole = Role::create(['name' => RoleConst::MANAGER_ROLE, 'guard_name' => 'staff']);
    $employeeRole = Role::create(['name' => RoleConst::EMPLOYEE_ROLE, 'guard_name' => 'staff']);

    // 権限を作成
    foreach (PermissionConst::PERMISSIONS as $permission) {
      Permission::create(['name' => $permission, 'guard_name' => 'staff']);
    }

    // ロールに権限を付与
    foreach (RoleConst::ROLE_PERMISSIONS as $roleName => $permissions) {
      $role = Role::where('name', $roleName)
        ->where('guard_name', 'staff')
        ->first();
      if ($role) {
        $role->givePermissionTo($permissions);
      }
    }

    // $adminRole->givePermissionTo(['create_users', 'update_users', 'create_products', 'update_products', 'view_products']);
    // $managerRole->givePermissionTo(['create_users', 'update_users', 'create_products', 'update_products']);
    // $employeeRole->givePermissionTo(['view_products']);
  }
}
