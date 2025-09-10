web: python manage.py collectstatic --noinput && python manage.py migrate && gunicorn focus.wsgi --bind 0.0.0.0:\$PORT
