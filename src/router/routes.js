import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
export default   [
    {
        path:'/ShopCart',
        meta: { show: true },
        name:'shopCart',
        component:ShopCart ,
    },
    {
        // 路由路径
        path: '/Detail/:goodsId',
        // 组件信息
        component: Detail,
        // 配置路由元信息来判断是否需要显示Footer组件 方法为v-show="$route.meat.show" 如果show属性为true则显示 false 则不显示
        meta: { show: true }
    },
    {
        path: '/home',
        component: Home,
        // 配置路由元信息来判断是否需要显示Footer组件 方法为$route.meat.show 如果show属性为true则显示 false 则不显示
        meta: { show: true }
    },
    {
        // 在占位符后面加上?qapams参数就可传可不传
        path: '/Search/:keyword?',
        component: Search,
        name: 'search',
        meta: { show: true }
    },
    {
        path: '/Login',
        component: Login,
        meta: { show: false },
        name: 'login'
    },
    {
        path: '/Register',
        component: Register,
        meta: { show: false }
    },
    {
        path: '/AddCartSuccess',
        component: AddCartSuccess,
        meta: { show: true },
        name:'addCartSuccess',
    },
    {
        // 默认跳转到首页
        path: '*',
        redirect: '/home'
    }
]