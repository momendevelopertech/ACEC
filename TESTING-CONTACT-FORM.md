# Contact Form Testing Guide

## Prerequisites
- Supabase project is configured
- Environment variables are set in `.env.local`
- Database table `contacts` has been created
- Website is running locally or deployed

## Testing Steps

### 1. **Run the Development Server**
```bash
npm run dev
```
Open http://localhost:3000 in your browser.

### 2. **Navigate to Contact Form**
- Go to the Contact page by clicking "تواصل معنا" (Arabic) or "Contact Us" (English)
- Or navigate directly to `/ar/contact` or `/en/contact`

### 3. **Submit a Test Message**

Fill out the contact form with:
- **Name**: Test User
- **Email**: test@example.com
- **Phone**: (optional) +966 5xx xxx xxxx
- **Service**: (optional) Select any service
- **Message**: This is a test message to verify Supabase integration

Click the "إرسال" (Arabic) or "Submit" (English) button.

### 4. **Verify Success Message**
You should see a gold/green success message:
- Arabic: "تم استقبال رسالتك بنجاح"
- English: "Your message has been received successfully"

### 5. **Check Supabase Database**

1. Log in to your Supabase dashboard
2. Go to **Project Settings → Database**
3. Navigate to **SQL Editor**
4. Run this query:
```sql
SELECT * FROM public.contacts ORDER BY created_at DESC LIMIT 10;
```

You should see your test submission with:
- ID (UUID)
- Name: "Test User"
- Email: "test@example.com"
- Message: "This is a test message to verify Supabase integration"
- Created_at: Current timestamp

### 6. **Test Error Validation**

Try submitting with invalid data:
- **Empty name**: Should show "Name is required"
- **Invalid email**: Should show "Please enter a valid email address"
- **Message < 10 chars**: Should show "Message must be at least 10 characters long"
- **Empty message**: Should show "Message is required"

### 7. **Test Success Reset (Optional)**
After successful submission, the form should:
- Clear all input fields
- Show success message for 5 seconds
- Return to "idle" state
- Allow new submissions

## Troubleshooting

### Error: "Missing Supabase environment variables"
**Solution**: Check that `.env.local` has:
```
NEXT_PUBLIC_SUPABASE_URL=https://zlrpaazqzluvlkdvwqks.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_hK8eAyHBHJZDltPl4YyD8Q_wUwfB6Xk
```
Then restart the dev server.

### Error: "relation 'contacts' does not exist"
**Solution**: Run the SQL from `supabase-setup.sql` in Supabase SQL Editor to create the table.

### Error: "Failed to submit contact form"
**Solution**: 
- Check browser console for details
- Verify Supabase is accessible
- Check network tab to see the actual error
- Verify Row Level Security policies are correct

### Success message appears but data not in database
**Solution**:
- Refresh Supabase dashboard
- Check the correct table `public.contacts`
- Verify RLS policies allow anonymous insert

## Production Testing Checklist

- [ ] Test form on desktop browsers (Chrome, Firefox, Safari)
- [ ] Test form on mobile devices
- [ ] Test Arabic RTL layout
- [ ] Test error cases with various inputs
- [ ] Verify data appears correctly in Supabase
- [ ] Check loading states work properly
- [ ] Verify success messages clear after 5 seconds
- [ ] Test with actual user data before launch

## API Response Format

**Success Response**:
```javascript
{
  success: true,
  data: {
    id: "uuid-here",
    name: "User Name",
    email: "user@example.com",
    message: "User message",
    created_at: "2026-04-13T10:30:00Z"
  }
}
```

**Error Response**:
```javascript
{
  success: false,
  error: "Error message describing what went wrong"
}
```

## Next Steps

1. Test the form thoroughly
2. Once verified, deploy to Vercel
3. Run production tests
4. Monitor Supabase logs for any issues
5. Set up email notifications (optional)
