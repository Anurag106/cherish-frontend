/**
 * Data Export Utilities
 * Functions to export data as CSV or Excel files
 */

/**
 * Convert array of objects to CSV string
 */
export const convertToCSV = (data: any[], headers?: string[]): string => {
  if (!data || data.length === 0) {
    return '';
  }

  // Get headers from first object if not provided
  const csvHeaders = headers || Object.keys(data[0]);
  
  // Create header row
  const headerRow = csvHeaders.join(',');
  
  // Create data rows
  const dataRows = data.map(row => {
    return csvHeaders.map(header => {
      const value = row[header];
      // Handle values that contain commas, quotes, or newlines
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value ?? '';
    }).join(',');
  }).join('\n');
  
  return `${headerRow}\n${dataRows}`;
};

/**
 * Download data as CSV file
 */
export const downloadCSV = (data: any[], filename: string, headers?: string[]): void => {
  const csv = convertToCSV(data, headers);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

/**
 * Format date for filename
 */
export const getExportTimestamp = (): string => {
  const now = new Date();
  return now.toISOString().split('T')[0]; // YYYY-MM-DD
};

/**
 * Export P2P vs Awards chart data
 */
export const exportP2PVsAwardsData = (
  data: { date: string; p2p: number; awards: number }[],
  filename: string
): void => {
  const formattedData = data.map(item => ({
    Date: new Date(item.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }),
    'P2P Recognition': item.p2p.toLocaleString(),
    'Awards': item.awards.toLocaleString(),
    'Total': (item.p2p + item.awards).toLocaleString(),
  }));
  
  downloadCSV(formattedData, `${filename}_${getExportTimestamp()}`);
};

/**
 * Export users chart data
 */
export const exportUsersData = (
  data: { date: string; users: number }[],
  filename: string
): void => {
  const formattedData = data.map(item => ({
    Date: new Date(item.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }),
    'Number of Users': item.users.toLocaleString(),
  }));
  
  downloadCSV(formattedData, `${filename}_${getExportTimestamp()}`);
};

/**
 * Export generic chart data with custom formatting
 */
export const exportChartData = (
  data: any[],
  filename: string,
  columnMapping?: Record<string, string>
): void => {
  let formattedData = data;
  
  // Apply column mapping if provided
  if (columnMapping) {
    formattedData = data.map(item => {
      const formatted: any = {};
      Object.entries(columnMapping).forEach(([key, label]) => {
        const value = item[key];
        // Format numbers with commas
        formatted[label] = typeof value === 'number' 
          ? value.toLocaleString() 
          : value;
      });
      return formatted;
    });
  }
  
  downloadCSV(formattedData, `${filename}_${getExportTimestamp()}`);
};

