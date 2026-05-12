<?php

namespace App\Filament\Resources\JobPostings\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class JobPostingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title_ar')
                    ->label(__('admin.col_title_ar'))
                    ->required(),
                TextInput::make('title_en')
                    ->label(__('admin.col_title_en'))
                    ->required(),
                Textarea::make('description_ar')
                    ->label(__('admin.col_description_ar'))
                    ->columnSpanFull(),
                Textarea::make('description_en')
                    ->label(__('admin.col_description_en'))
                    ->columnSpanFull(),
                Textarea::make('requirements_ar')
                    ->label(__('admin.col_requirements_ar'))
                    ->columnSpanFull(),
                Textarea::make('requirements_en')
                    ->label(__('admin.col_requirements_en'))
                    ->columnSpanFull(),
                TextInput::make('location_ar')
                    ->label(__('admin.col_location_ar')),
                TextInput::make('location_en')
                    ->label(__('admin.col_location_en')),
                TextInput::make('type')
                    ->label(__('admin.col_type')),
                TextInput::make('salary_range')
                    ->label(__('admin.col_salary_range')),
                Toggle::make('is_active')
                    ->label(__('admin.col_is_active'))
                    ->required(),
                DateTimePicker::make('expires_at')
                    ->label(__('admin.col_expires_at')),
            ]);
    }
}
