
from storages.backends.azure_storage import AzureStorage

class AzureMediaStorage(AzureStorage):
    account_name = 'spadevstorage' # Must be replaced by your <storage_account_name>
    account_key = 'S85R03jT58lGbaHUk23p/qn5FumLcEL5G06GnjkjgBIyFIMhhbFEFjpZlGOQwhuETZa7bD11/C2V+ASt8QXKng==' # Must be replaced by your <storage_account_key>
    azure_container = 'media'
    expiration_secs = None

class AzureStaticStorage(AzureStorage):
    account_name = 'spadevstorage' # Must be replaced by your storage_account_name
    account_key = 'S85R03jT58lGbaHUk23p/qn5FumLcEL5G06GnjkjgBIyFIMhhbFEFjpZlGOQwhuETZa7bD11/C2V+ASt8QXKng==' # Must be replaced by your <storage_account_key>
    azure_container = 'staticfile'
    expiration_secs = None