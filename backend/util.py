from datetime import timezone
from backend.values import DATETIME_FORMAT
from random import choice
import string


def utc_to_local(utc_dt):
    return utc_dt.replace(tzinfo=timezone.utc).astimezone(tz=None)


def datetime_browser_format(dt):
    return dt.strftime(DATETIME_FORMAT)


def auth_token():
    allowed_chars = string.ascii_letters + '0123456789'
    return ''.join([choice(allowed_chars) for _ in range(128)])
