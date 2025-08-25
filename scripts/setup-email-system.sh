#!/bin/bash

# Email System Setup Script
# This script helps you configure the email system environment variables

echo "🚀 Setting up Email System for Bayyinah Academy"
echo "================================================"

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "📁 Found existing .env.local file"
    read -p "Do you want to backup the existing file? (y/n): " backup_choice
    if [ "$backup_choice" = "y" ] || [ "$backup_choice" = "Y" ]; then
        cp .env.local .env.local.backup.$(date +%Y%m%d_%H%M%S)
        echo "✅ Backup created"
    fi
else
    echo "📁 No .env.local file found, creating new one"
fi

# Get Brevo API key
echo ""
echo "🔑 Brevo API Configuration"
echo "-------------------------"
read -p "Enter your Brevo API key: " brevo_api_key

# Get email configuration
echo ""
echo "📧 Email Configuration"
echo "---------------------"
read -p "Enter FROM_EMAIL (e.g., noreply@yourdomain.com): " from_email
read -p "Enter FROM_NAME (e.g., Bayyinah Academy): " from_name

# Get admin notification emails
echo ""
echo "👥 Admin Notification Emails"
echo "----------------------------"
read -p "Enter NOTIFY_TRIAL email: " notify_trial
read -p "Enter NOTIFY_TRIAL_2 email: " notify_trial_2
read -p "Enter NOTIFY_CONTACT email: " notify_contact
read -p "Enter NOTIFY_CONTACT_2 email: " notify_contact_2
read -p "Enter NOTIFY_FAQ email: " notify_faq
read -p "Enter NOTIFY_FAQ_2 email: " notify_faq_2
read -p "Enter NOTIFY_CALLBACK email: " notify_callback
read -p "Enter NOTIFY_CALLBACK_2 email: " notify_callback_2
read -p "Enter NOTIFY_ENROLLMENT email: " notify_enrollment
read -p "Enter NOTIFY_ENROLLMENT_2 email: " notify_enrollment_2
read -p "Enter NOTIFY_STUDENT email: " notify_student
read -p "Enter NOTIFY_STUDENT_2 email: " notify_student_2
read -p "Enter NOTIFY_TEACHER email: " notify_teacher
read -p "Enter NOTIFY_TEACHER_2 email: " notify_teacher_2

# Get Brevo list IDs
echo ""
echo "📋 Brevo List IDs"
echo "-----------------"
read -p "Enter BREVO_LIST_NEWSLETTER ID: " list_newsletter
read -p "Enter BREVO_LIST_TRIAL ID: " list_trial
read -p "Enter BREVO_LIST_STUDENT ID: " list_student
read -p "Enter BREVO_LIST_TEACHER ID: " list_teacher
read -p "Enter BREVO_LIST_CONTACT ID: " list_contact
read -p "Enter BREVO_LIST_CALLBACK ID: " list_callback

# Get Brevo template IDs
echo ""
echo "📝 Brevo Template IDs"
echo "---------------------"
read -p "Enter BREVO_TEMPLATE_TRIAL_CONFIRMATION ID (Template #6): " template_trial
read -p "Enter BREVO_TEMPLATE_STUDENT_WELCOME ID (Template #9): " template_student
read -p "Enter BREVO_TEMPLATE_TEACHER_AUTO_RESPONSE ID (Template #14): " template_teacher
read -p "Enter BREVO_TEMPLATE_WELCOME ID (if available): " template_welcome
read -p "Enter BREVO_TEMPLATE_CONTACT_CONFIRMATION ID (if available): " template_contact
read -p "Enter BREVO_TEMPLATE_CALLBACK_CONFIRMATION ID (if available): " template_callback

# Create or update .env.local
echo ""
echo "📝 Creating/Updating .env.local file..."
echo ""

cat > .env.local << EOF
# Brevo API Configuration
BREVO_API_KEY=${brevo_api_key}

# Email Configuration
FROM_EMAIL=${from_email}
FROM_NAME=${from_name}

# Admin Notification Emails
NOTIFY_TRIAL=${notify_trial}
NOTIFY_TRIAL_2=${notify_trial_2}
NOTIFY_CONTACT=${notify_contact}
NOTIFY_CONTACT_2=${notify_contact_2}
NOTIFY_FAQ=${notify_faq}
NOTIFY_FAQ_2=${notify_faq_2}
NOTIFY_CALLBACK=${notify_callback}
NOTIFY_CALLBACK_2=${notify_callback_2}
NOTIFY_ENROLLMENT=${notify_enrollment}
NOTIFY_ENROLLMENT_2=${notify_enrollment_2}
NOTIFY_STUDENT=${notify_student}
NOTIFY_STUDENT_2=${notify_student_2}
NOTIFY_TEACHER=${notify_teacher}
NOTIFY_TEACHER_2=${notify_teacher_2}

# Brevo List IDs
BREVO_LIST_NEWSLETTER=${list_newsletter}
BREVO_LIST_TRIAL=${list_trial}
BREVO_LIST_STUDENT=${list_student}
BREVO_LIST_TEACHER=${list_teacher}
BREVO_LIST_CONTACT=${list_contact}
BREVO_LIST_CALLBACK=${list_callback}

# Brevo Template IDs
BREVO_TEMPLATE_TRIAL_CONFIRMATION=${template_trial}
BREVO_TEMPLATE_STUDENT_WELCOME=${template_student}
BREVO_TEMPLATE_TEACHER_AUTO_RESPONSE=${template_teacher}
BREVO_TEMPLATE_WELCOME=${template_welcome}
BREVO_TEMPLATE_CONTACT_CONFIRMATION=${template_contact}
BREVO_TEMPLATE_CALLBACK_CONFIRMATION=${template_callback}
EOF

echo "✅ .env.local file created/updated successfully!"
echo ""
echo "🎯 Next Steps:"
echo "1. Review the .env.local file to ensure all values are correct"
echo "2. Start your development server: pnpm dev"
echo "3. Test the email system: node scripts/test-email-templates.js"
echo "4. Check your email inbox for confirmation emails"
echo "5. Check your admin email for notification emails"
echo ""
echo "📚 For more information, see EMAIL_SYSTEM_README.md"
echo ""
echo "🚀 Email system setup complete!"
