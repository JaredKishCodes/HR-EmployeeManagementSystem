

namespace EmployeeManagementSystem.Application.Helper
{
    public static class DateTimeHelper
    {
        public static DateTime ConvertToPhilippineTime(DateTime utcDateTime)
        {
            // Ensure the incoming DateTime is treated as UTC
            if (utcDateTime.Kind == DateTimeKind.Unspecified)
            {
                utcDateTime = DateTime.SpecifyKind(utcDateTime, DateTimeKind.Utc);
            }

            return TimeZoneInfo.ConvertTimeFromUtc(
                utcDateTime,
                TimeZoneInfo.FindSystemTimeZoneById("Singapore Standard Time") // PH uses same zone
            );
        }

    }

}
