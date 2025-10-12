/**
 * Simplified validation for recognition text patterns
 * 
 * Validates that text contains:
 * - @user mentions
 * - #hashtags  
 * - +points
 */

/**
 * Validate text for recognition requirements:
 * 1. At least one user mention (@username)
 * 2. At least one hashtag (#hashtag)
 * 3. At least one point allocation (+points)
 * 4. Message content (not just mentions/hashtags/points)
 * 5. Points should not exceed limits
 */
export function validateRecognitionText(
  text: string,
  options: {
    maxPoints?: number;
    allowedPointValues?: number[];
  } = {}
): { isValid: boolean; error?: string } {
  const {
    maxPoints = 100,
    allowedPointValues = [5, 10, 20, 50],
  } = options;

  // 1. Must have at least one user mention
  const userMentions = text.match(/@\w+/g) || [];
  if (userMentions.length === 0) {
    return {
      isValid: false,
      error: 'Please mention at least one user (@username)',
    };
  }

  // 2. Must have at least one hashtag
  const hashtags = text.match(/#\w+/g) || [];
  if (hashtags.length === 0) {
    return {
      isValid: false,
      error: 'Please add at least one hashtag (#hashtag)',
    };
  }

  // 3. Must have points allocated
  const points = text.match(/\+\d+/g) || [];
  if (points.length === 0) {
    return {
      isValid: false,
      error: 'Please allocate points (+points)',
    };
  }

  // 4. Validate point values (allow custom points)
  for (const pointStr of points) {
    const pointValue = parseInt(pointStr.substring(1), 10); // Remove + and parse
    if (isNaN(pointValue)) {
      return { isValid: false, error: 'Invalid point value detected.' };
    }

    if (pointValue > maxPoints) {
      return {
        isValid: false,
        error: `Point value ${pointValue} exceeds maximum allowed (${maxPoints}).`,
      };
    }

    // Allow custom points - no restriction to allowedPointValues
    if (pointValue <= 0) {
      return {
        isValid: false,
        error: `Point value must be greater than 0.`,
      };
    }
  }

  // 5. Total points calculation: (unique users mentioned) × (point value)
  // Only use the first point value (as per requirement)
  const firstPointStr = points.length > 0 ? points[0] : '';
  const pointValue = firstPointStr ? parseInt(firstPointStr.substring(1), 10) : 0;
  const totalPoints = userMentions.length * pointValue;
  const maxAllowedPoints = userMentions.length * maxPoints;
  
  if (totalPoints > maxAllowedPoints) {
    return {
      isValid: false,
      error: `Total points (${totalPoints}) cannot exceed ${maxAllowedPoints} (${userMentions.length} users × ${maxPoints} points each)`,
    };
  }

  // 6. Must have message content (not just mentions/hashtags/points)
  const messageContent = text
    .replace(/@\w+/g, '') // Remove mentions
    .replace(/#\w+/g, '') // Remove hashtags  
    .replace(/\+\d+/g, '') // Remove points
    .trim();
    
  if (messageContent.length === 0) {
    return {
      isValid: false,
      error: 'Please add a message describing the recognition',
    };
  }

  return { isValid: true };
}
