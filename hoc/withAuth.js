import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { checkUserAuthentication } from './auth';
import { ROUTES } from '@/utils/Routes';

export function withAuth(Component) {
    return function AuthenticatedComponent(props) {
        const router = useRouter();
        const [checked, setChecked] = useState(false);
        useEffect(() => {
            const isAuth = checkUserAuthentication(); // Implement this function to check auth status

            if (!isAuth && router.asPath !== ROUTES.SIGN_UP && router.asPath !== ROUTES.SIGN_IN) {
                router.push(router.asPath === ROUTES.SIGN_UP ? ROUTES.SIGN_UP : ROUTES.SIGN_IN);
            } else if (isAuth && router.asPath === "/") {
                router.push("/dashboard");
            }

            setChecked(true);
        }, [router]);

        // Prevent the component from rendering until the auth check is done
        if (!checked) {
            return null;
        }

        return <Component {...props} />;
    };
}
