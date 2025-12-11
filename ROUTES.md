# Application Routes

## Authentication Routes

### Login
- `/login` - Main login page (redirects to role-specific pages)
- `/learner/login` - Learner login page
- `/teacher/login` - Teacher login page

### Signup
- `/signup` - Main signup page (redirects to role-specific pages)
- `/learner/signup` - Learner signup page
- `/teacher/signup` - Teacher signup page

## Main Pages

- `/landing` - Landing page with role selection
- `/browse` - Browse teachers (for learners)
- `/teachers` - List all teachers
- `/teacher/[id]` - Teacher detail page
- `/tutor/dashboard` - Teacher dashboard (shows student inquiries)

## API Routes

- `/api/inquiries` - Manage student inquiries (GET, POST, PUT)

## Authentication Flow

1. Users visit `/landing` to choose their role
2. Learners can sign up at `/learner/signup` or login at `/learner/login`
3. Teachers can sign up at `/teacher/signup` or login at `/teacher/login`
4. After login, teachers are redirected to `/tutor/dashboard`
5. The dashboard shows all student inquiries and allows teachers to update their status