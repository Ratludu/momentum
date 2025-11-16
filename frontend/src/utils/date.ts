export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "Unknown date";
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return "Invalid date";
  }
}

export function formatDateTime(dateString: string | null | undefined): string {
  if (!dateString) return "Unknown date";
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return "Invalid date";
  }
}
