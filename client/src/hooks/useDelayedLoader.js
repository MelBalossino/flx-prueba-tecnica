// ! Hook personalizado reutilizable para mostrar un spinner de antd y simular un tiempo de carga
// ! entre peticiones como se solicitó en las consignas.

import { useState, useEffect } from 'react';

const useDelayedLoader = (action, delay = 1000) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            action().finally(() => setLoading(false));
        }, delay);
        return () => clearTimeout(timer);
    }, [action, delay]);

    return loading;
};

export default useDelayedLoader;