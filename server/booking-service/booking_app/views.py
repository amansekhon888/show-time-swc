from django.http import JsonResponse


def booking_test(request):
    return JsonResponse({'message': 'Booking Service is running'})
