web: python manage.py collectstatic --noinput && python manage.py migrate && gunicorn focus.wsgi --host 0.0.0.0 --port $PORT
