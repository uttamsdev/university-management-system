import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";

export const adminRoutes = [
    {
        name: 'Dashboard',
        path: '/admin/dashboard',
        element: <AdminDashboard />
    },
    {
        name: 'Create Student',
        path: '/admin/create-student',
        element: <CreateStudent />
    },
    {
        name: 'Create Admin',
        path: '/admin/create-admin',
        element: <CreateAdmin />
    },
    {
        name: "Create Faculty",
        path: '/admin/create-faculty',
        element: <CreateFaculty />
    }
]