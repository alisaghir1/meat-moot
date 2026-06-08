-- ============================================================================
-- Meat Moot — back-fill Arabic + Russian translations for seeded menu items.
-- Safe to re-run: only updates rows where the target field is NULL or empty.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- SMOKED MEATS
-- ----------------------------------------------------------------------------

-- Lamb Shank
update public.menu_items set
  name_ar        = coalesce(nullif(name_ar, ''),        'كراع الغنم'),
  description_ar = coalesce(nullif(description_ar, ''), 'أفضل وأشهى كراع الغنم المدخنة. تأتي مع 8 صلصات، 6 سلطات، ومشروب من اختيارك.'),
  name_ru        = coalesce(nullif(name_ru, ''),        'Рулька ягнёнка'),
  description_ru = coalesce(nullif(description_ru, ''), 'Нежнейшие копчёные рульки ягнёнка. Подаются с 8 соусами, 6 салатами и напитком на ваш выбор.')
where name = 'Lamb Shank';

-- Lamb Neck
update public.menu_items set
  name_ar        = coalesce(nullif(name_ar, ''),        'عنق الغنم'),
  description_ar = coalesce(nullif(description_ar, ''), 'لحمة عنق الغنم المدخنة الكلاسيكية. تأتي مع 8 صلصات، 6 سلطات، ومشروب من اختيارك.'),
  name_ru        = coalesce(nullif(name_ru, ''),        'Шея ягнёнка'),
  description_ru = coalesce(nullif(description_ru, ''), 'Классическая копчёная шея ягнёнка. Подаётся с 8 соусами, 6 салатами и напитком на ваш выбор.')
where name = 'Lamb Neck';

-- Lamb Shoulder
update public.menu_items set
  name_ar        = coalesce(nullif(name_ar, ''),        'كتف الغنم'),
  description_ar = coalesce(nullif(description_ar, ''), 'لحم الكتف المدخن الأصيل. يأتي مع 8 صلصات، 6 سلطات، ومشروب من اختيارك.'),
  name_ru        = coalesce(nullif(name_ru, ''),        'Лопатка ягнёнка'),
  description_ru = coalesce(nullif(description_ru, ''), 'Аутентичное копчёное мясо. Подаётся с 8 соусами, 6 салатами и напитком на ваш выбор.')
where name = 'Lamb Shoulder';

-- Lamb Ribs
update public.menu_items set
  name_ar        = coalesce(nullif(name_ar, ''),        'ضلوع الغنم'),
  description_ar = coalesce(nullif(description_ar, ''), 'أفضل ضلوع الغنم المدخنة. تأتي مع 8 صلصات، 6 سلطات، ومشروب من اختيارك.'),
  name_ru        = coalesce(nullif(name_ru, ''),        'Рёбра ягнёнка'),
  description_ru = coalesce(nullif(description_ru, ''), 'Лучшие копчёные рёбра ягнёнка. Подаются с 8 соусами, 6 салатами и напитком на ваш выбор.')
where name = 'Lamb Ribs';

-- Beef Ribs
update public.menu_items set
  name_ar        = coalesce(nullif(name_ar, ''),        'ضلوع البقر'),
  description_ar = coalesce(nullif(description_ar, ''), 'ضلوع بقر عصيرية ولذيذة. تأتي مع 8 صلصات، 6 سلطات، ومشروب من اختيارك.'),
  name_ru        = coalesce(nullif(name_ru, ''),        'Говяжьи рёбра'),
  description_ru = coalesce(nullif(description_ru, ''), 'Сочные и ароматные рёбра. Подаются с 8 соусами, 6 салатами и напитком на ваш выбор.')
where name = 'Beef Ribs';

-- Beef Brisket
update public.menu_items set
  name_ar        = coalesce(nullif(name_ar, ''),        'صدر البقر'),
  description_ar = coalesce(nullif(description_ar, ''), 'صدر بقر مدخن طري. يأتي مع 8 صلصات، 6 سلطات، ومشروب من اختيارك.'),
  name_ru        = coalesce(nullif(name_ru, ''),        'Говяжья грудинка'),
  description_ru = coalesce(nullif(description_ru, ''), 'Нежная копчёная грудинка. Подаётся с 8 соусами, 6 салатами и напитком на ваш выбор.')
where name = 'Beef Brisket';

-- Beef Shank
update public.menu_items set
  name_ar        = coalesce(nullif(name_ar, ''),        'كراع البقر'),
  description_ar = coalesce(nullif(description_ar, ''), 'عقب لحم بقري مدخن طري. تأتي مع 8 صلصات، 6 سلطات، ومشروب من اختيارك.'),
  name_ru        = coalesce(nullif(name_ru, ''),        'Говяжья рулька'),
  description_ru = coalesce(nullif(description_ru, ''), 'Нежная копчёная рулька. Подаётся с 8 соусами, 6 салатами и напитком на ваш выбор.')
where name = 'Beef Shank';

-- ----------------------------------------------------------------------------
-- URGE BURGERS
-- ----------------------------------------------------------------------------

-- Urge Burger
update public.menu_items set
  name_ar        = coalesce(nullif(name_ar, ''),        'أورج برجر'),
  description_ar = coalesce(nullif(description_ar, ''), 'قطعة لحم بقري مشوي بوزن 65 جرام مع جبن الشيدر الذائب وصلصة الجبن الغنية وصلصة الترفل الكريمية في خبز سدوي ذهبي. يُقدم مع طماطم طازجة ومخلل لاذع.'),
  name_ru        = coalesce(nullif(name_ru, ''),        'Бургер «Urge»'),
  description_ru = coalesce(nullif(description_ru, ''), 'Сочная котлета из говядины 65г с расплавленным чеддером, сырным и трюфельным соусами в золотистой сдобной булке. Подаётся со свежими томатами и солёными огурчиками.')
where name = 'Urge Burger';

-- Double Urge Burger
update public.menu_items set
  name_ar        = coalesce(nullif(name_ar, ''),        'برجر دبل أورج'),
  description_ar = coalesce(nullif(description_ar, ''), 'ضعف اللحم، ضعف الإشباع! قطعتان من لحم البقر المشوي بوزن إجمالي 130 جرام مع جبن الشيدر الذائب وصلصة الترفل وصلصة الجبن في خبز محمص طري.'),
  name_ru        = coalesce(nullif(name_ru, ''),        'Двойной бургер «Urge»'),
  description_ru = coalesce(nullif(description_ru, ''), 'Вдвойне больше мяса! Две котлеты из говядины (130г) с расплавленным чеддером, трюфельным и сырным соусами в поджаренной сдобной булке.')
where name ilike 'Double Urge Burger%' and name not ilike '%Mushroom%';

-- Urge Mushroom Burger
update public.menu_items set
  name_ar        = coalesce(nullif(name_ar, ''),        'برجر أورج بالمشروم'),
  description_ar = coalesce(nullif(description_ar, ''), 'قطعة لحم بقري مشوي 80 جرام مع جبن الشيدر وصلصة الجبن وصلصة الفطر والفطر السوتيه وصلصة الترفل في خبز ذهبي طري.'),
  name_ru        = coalesce(nullif(name_ru, ''),        'Бургер «Urge» с грибами'),
  description_ru = coalesce(nullif(description_ru, ''), 'Котлета 80г с расплавленным чеддером, сырным соусом, грибным соусом и обжаренными грибами — с трюфельным соусом в золотистой булке.')
where name = 'Urge Mushroom Burger';

-- Double Urge Mushroom Burger
update public.menu_items set
  name_ar        = coalesce(nullif(name_ar, ''),        'برجر دبل أورج بالمشروم'),
  description_ar = coalesce(nullif(description_ar, ''), 'قطعتا لحم بقري مشوي (160 جرام) مع جبن الشيدر وصلصة الجبن وصلصة الفطر وفطر سوتيه وصلصة الترفل في خبز ذهبي طري.'),
  name_ru        = coalesce(nullif(name_ru, ''),        'Двойной бургер «Urge» с грибами'),
  description_ru = coalesce(nullif(description_ru, ''), 'Две котлеты (160г) с расплавленным чеддером, сырным и грибным соусами, обжаренными грибами и трюфельным соусом в золотистых сдобных булках.')
where name = 'Double Urge Mushroom Burger';

-- Urge Max Burger – Double
update public.menu_items set
  name_ar        = coalesce(nullif(name_ar, ''),        'برجر أورج ماكس – دبل'),
  description_ar = coalesce(nullif(description_ar, ''), 'قطعتان من لحم البقر المشوي (200 جرام) مع جبن الشيدر وصلصة الجبن وصلصة الترفل في خبز ذهبي محمص. يُقدم مع مشروب غازي وبطاطس أورج.'),
  name_ru        = coalesce(nullif(name_ru, ''),        'Бургер «Urge Max» – Двойной'),
  description_ru = coalesce(nullif(description_ru, ''), 'Два говяжьих котлета (200г) с расплавленным чеддером, сырным и трюфельным соусами в поджаренной булке. Подаётся с напитком и картошкой «Urge».')
where name ilike 'Urge Max Burger%';

-- Mini Urge Burger – Kids
update public.menu_items set
  name_ar        = coalesce(nullif(name_ar, ''),        'ميني أورج برجر – للأطفال'),
  description_ar = coalesce(nullif(description_ar, ''), 'وجبة شهية للأطفال: برجران صغيران مع قطعة لحم 35 جرام وجبن شيدر وصلصة جبن في خبز طري. يُقدم مع مشروب غازي وبطاطس أورج.'),
  name_ru        = coalesce(nullif(name_ru, ''),        'Мини-бургер «Urge» – Детский'),
  description_ru = coalesce(nullif(description_ru, ''), 'Два мини-бургера с котлетой 35г, чеддером и сырным соусом. Подаётся с напитком и картошкой «Urge».')
where name ilike 'Mini Urge Burger%';
