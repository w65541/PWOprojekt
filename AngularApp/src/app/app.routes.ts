import { Routes } from '@angular/router';
import { UsersPage } from './Components/users-page/users-page';
import { UsersDetail } from './Components/users-detail/users-detail';
import { UserCreate } from './Components/user-create/user-create';
import { Login } from './Components/login/login';
import { Forgot } from './Components/forgot/forgot';
import { PieChart } from './Components/pie-chart/pie-chart';
import { DailyActivityChart } from './Components/daily-activity-chart/daily-activity-chart';
export const routes: Routes = [
    {path: "login", component: Login},
    {path: "users", component: UsersPage},
    {path: "userDetails/:id", component: UsersDetail},
    {path: "userCreate", component: UserCreate},
    {path: "forgot", component: Forgot},
    {path: "pieChart", component: PieChart},
    {path: "DAChart", component: DailyActivityChart},
];
