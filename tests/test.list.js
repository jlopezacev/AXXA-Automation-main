import { test } from '@playwright/test';
import feature1Tests from '@playwright/test/7378 - add_shared_properties_dimension-Add_new_dimmension.spec.js'
import feature2Tests from '@playwright/test/7503 - add Shared Property Dimension-Property_name_must_be_unique.spec.js'

test.describe(feature1Tests);
test.describe(feature2Tests);