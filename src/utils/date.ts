import { isToday, isYesterday, format } from 'date-fns';
import { TOptionsDate } from './types/types';

export const dateWhen = (date: Date) => {
    if (isToday(date)) {
        return 'Сегодня'
    } else if (isYesterday(date)) {
        return 'Вчера'
    } else {
        return format((date), 'MM.dd.yyyy');
    }
}

export const dateFormat = (date: string) => {
    const options: TOptionsDate = {
        timezone: 'Moscow',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: "short",
    }

    return new Date(Date.parse(date)).toLocaleString("ru", options)
}