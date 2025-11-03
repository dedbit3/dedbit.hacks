___

> Note: Terraform was used to automate the deployment of VM instances using the image file previously built by Packer.

Terraform Commands
---

Initializing terraform:

`terraform init .`

Preview and review terraform actions :

`terraform plan -out goad.plan`

Run terraform (deploy resources):

`terraform apply "goad.plan"`

Destroy all resources:

`terraform destroy`


main.tf config file
---
```powershell
terraform {
  required_providers {
    proxmox = {
      source  = "bpg/proxmox"
      version = "0.65.0"
    }
  }
}

provider "proxmox" {
  endpoint = var.pm_api_url
  username = var.pm_user
  password = var.pm_password
  insecure = true
}
```

Goad.plan sample file
---
```powershell
Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # proxmox_virtual_environment_vm.bgp["dc01"] will be created
  + resource "proxmox_virtual_environment_vm" "bgp" {
      + acpi                    = true
      + bios                    = "seabios"
      + description             = "DC01 - windows server 2019 - 192.168.10.10"
      + id                      = (known after apply)
      + ipv4_addresses          = (known after apply)
      + ipv6_addresses          = (known after apply)
      + keyboard_layout         = "en-us"
      + mac_addresses           = (known after apply)
      + migrate                 = false
      + name                    = "DC01"
      + network_interface_names = (known after apply)
      + node_name               = "proxmox"
      + on_boot                 = true
      + pool_id                 = "GOAD"
      + protection              = false
      + reboot                  = false
      + scsi_hardware           = "virtio-scsi-pci"
      + started                 = true
      + stop_on_destroy         = false
      + tablet_device           = true
      + template                = false
      + timeout_clone           = 1800
      + timeout_create          = 1800
      + timeout_migrate         = 1800
      + timeout_move_disk       = 1800
      + timeout_reboot          = 1800
      + timeout_shutdown_vm     = 1800
      + timeout_start_vm        = 1800
      + timeout_stop_vm         = 300
      + vm_id                   = (known after apply)

      + agent {
          + enabled = true
          + timeout = "15m"
          + trim    = false
          + type    = "virtio"
        }

      + clone {
          + full    = false
          + retries = 2
          + vm_id   = 102
        }

      + cpu {
          + cores      = 2
          + hotplugged = 0
          + limit      = 0
          + numa       = false
          + sockets    = 1
          + type       = "qemu64"
          + units      = 1024
        }

      + initialization {
          + datastore_id = "local-lvm"
          + upgrade      = (known after apply)

          + dns {
              + servers = [
                  + "192.168.10.1",
                ]
            }

          + ip_config {
              + ipv4 {
                  + address = "192.168.10.10/24"
                  + gateway = "192.168.10.1"
                }
            }
        }

      + memory {
          + dedicated      = 3096
          + floating       = 0
          + keep_hugepages = false
          + shared         = 0
        }

      + network_device {
          + bridge      = "vmbr3"
          + enabled     = true
          + firewall    = false
          + mac_address = (known after apply)
          + model       = "e1000"
          + mtu         = 0
          + queues      = 0
          + rate_limit  = 0
          + vlan_id     = 10
        }

      + operating_system {
          + type = "win10"
        }
    }

  # proxmox_virtual_environment_vm.bgp["dc02"] will be created
  + resource "proxmox_virtual_environment_vm" "bgp" {
      + acpi                    = true
      + bios                    = "seabios"
      + description             = "DC02 - windows server 2019 - 192.168.10.11"
      + id                      = (known after apply)
      + ipv4_addresses          = (known after apply)
      + ipv6_addresses          = (known after apply)
      + keyboard_layout         = "en-us"
      + mac_addresses           = (known after apply)
      + migrate                 = false
      + name                    = "DC02"
      + network_interface_names = (known after apply)
      + node_name               = "proxmox"
      + on_boot                 = true
      + pool_id                 = "GOAD"
      + protection              = false
      + reboot                  = false
      + scsi_hardware           = "virtio-scsi-pci"
      + started                 = true
      + stop_on_destroy         = false
      + tablet_device           = true
      + template                = false
      + timeout_clone           = 1800
      + timeout_create          = 1800
      + timeout_migrate         = 1800
      + timeout_move_disk       = 1800
      + timeout_reboot          = 1800
      + timeout_shutdown_vm     = 1800
      + timeout_start_vm        = 1800
      + timeout_stop_vm         = 300
      + vm_id                   = (known after apply)

      + agent {
          + enabled = true
          + timeout = "15m"
          + trim    = false
          + type    = "virtio"
        }

      + clone {
          + full    = false
          + retries = 2
          + vm_id   = 102
        }

      + cpu {
          + cores      = 2
          + hotplugged = 0
          + limit      = 0
          + numa       = false
          + sockets    = 1
          + type       = "qemu64"
          + units      = 1024
        }

      + initialization {
          + datastore_id = "local-lvm"
          + upgrade      = (known after apply)

          + dns {
              + servers = [
                  + "192.168.10.1",
                ]
            }

          + ip_config {
              + ipv4 {
                  + address = "192.168.10.11/24"
                  + gateway = "192.168.10.1"
                }
            }
        }

      + memory {
          + dedicated      = 3096
          + floating       = 0
          + keep_hugepages = false
          + shared         = 0
        }

      + network_device {
          + bridge      = "vmbr3"
          + enabled     = true
          + firewall    = false
          + mac_address = (known after apply)
          + model       = "e1000"
          + mtu         = 0
          + queues      = 0
          + rate_limit  = 0
          + vlan_id     = 10
        }

      + operating_system {
          + type = "win10"
        }
    }

  # proxmox_virtual_environment_vm.bgp["dc03"] will be created
  + resource "proxmox_virtual_environment_vm" "bgp" {
      + acpi                    = true
      + bios                    = "seabios"
      + description             = "DC03 - windows server 2016 - 192.168.10.12"
      + id                      = (known after apply)
      + ipv4_addresses          = (known after apply)
      + ipv6_addresses          = (known after apply)
      + keyboard_layout         = "en-us"
      + mac_addresses           = (known after apply)
      + migrate                 = false
      + name                    = "DC03"
      + network_interface_names = (known after apply)
      + node_name               = "proxmox"
      + on_boot                 = true
      + pool_id                 = "GOAD"
      + protection              = false
      + reboot                  = false
      + scsi_hardware           = "virtio-scsi-pci"
      + started                 = true
      + stop_on_destroy         = false
      + tablet_device           = true
      + template                = false
      + timeout_clone           = 1800
      + timeout_create          = 1800
      + timeout_migrate         = 1800
      + timeout_move_disk       = 1800
      + timeout_reboot          = 1800
      + timeout_shutdown_vm     = 1800
      + timeout_start_vm        = 1800
      + timeout_stop_vm         = 300
      + vm_id                   = (known after apply)

      + agent {
          + enabled = true
          + timeout = "15m"
          + trim    = false
          + type    = "virtio"
        }

      + clone {
          + full    = false
          + retries = 2
          + vm_id   = 103
        }

      + cpu {
          + cores      = 2
          + hotplugged = 0
          + limit      = 0
          + numa       = false
          + sockets    = 1
          + type       = "qemu64"
          + units      = 1024
        }

      + initialization {
          + datastore_id = "local-lvm"
          + upgrade      = (known after apply)

          + dns {
              + servers = [
                  + "192.168.10.1",
                ]
            }

          + ip_config {
              + ipv4 {
                  + address = "192.168.10.12/24"
                  + gateway = "192.168.10.1"
                }
            }
        }

      + memory {
          + dedicated      = 3096
          + floating       = 0
          + keep_hugepages = false
          + shared         = 0
        }

      + network_device {
          + bridge      = "vmbr3"
          + enabled     = true
          + firewall    = false
          + mac_address = (known after apply)
          + model       = "e1000"
          + mtu         = 0
          + queues      = 0
          + rate_limit  = 0
          + vlan_id     = 10
        }

      + operating_system {
          + type = "win10"
        }
    }

  # proxmox_virtual_environment_vm.bgp["srv02"] will be created
  + resource "proxmox_virtual_environment_vm" "bgp" {
      + acpi                    = true
      + bios                    = "seabios"
      + description             = "SRV02 - windows server 2019 - 192.168.10.22"
      + id                      = (known after apply)
      + ipv4_addresses          = (known after apply)
      + ipv6_addresses          = (known after apply)
      + keyboard_layout         = "en-us"
      + mac_addresses           = (known after apply)
      + migrate                 = false
      + name                    = "SRV02"
      + network_interface_names = (known after apply)
      + node_name               = "proxmox"
      + on_boot                 = true
      + pool_id                 = "GOAD"
      + protection              = false
      + reboot                  = false
      + scsi_hardware           = "virtio-scsi-pci"
      + started                 = true
      + stop_on_destroy         = false
      + tablet_device           = true
      + template                = false
      + timeout_clone           = 1800
      + timeout_create          = 1800
      + timeout_migrate         = 1800
      + timeout_move_disk       = 1800
      + timeout_reboot          = 1800
      + timeout_shutdown_vm     = 1800
      + timeout_start_vm        = 1800
      + timeout_stop_vm         = 300
      + vm_id                   = (known after apply)

      + agent {
          + enabled = true
          + timeout = "15m"
          + trim    = false
          + type    = "virtio"
        }

      + clone {
          + full    = false
          + retries = 2
          + vm_id   = 102
        }

      + cpu {
          + cores      = 2
          + hotplugged = 0
          + limit      = 0
          + numa       = false
          + sockets    = 1
          + type       = "qemu64"
          + units      = 1024
        }

      + initialization {
          + datastore_id = "local-lvm"
          + upgrade      = (known after apply)

          + dns {
              + servers = [
                  + "192.168.10.1",
                ]
            }

          + ip_config {
              + ipv4 {
                  + address = "192.168.10.22/24"
                  + gateway = "192.168.10.1"
                }
            }
        }

      + memory {
          + dedicated      = 6240
          + floating       = 0
          + keep_hugepages = false
          + shared         = 0
        }

      + network_device {
          + bridge      = "vmbr3"
          + enabled     = true
          + firewall    = false
          + mac_address = (known after apply)
          + model       = "e1000"
          + mtu         = 0
          + queues      = 0
          + rate_limit  = 0
          + vlan_id     = 10
        }

      + operating_system {
          + type = "win10"
        }
    }

  # proxmox_virtual_environment_vm.bgp["srv03"] will be created
  + resource "proxmox_virtual_environment_vm" "bgp" {
      + acpi                    = true
      + bios                    = "seabios"
      + description             = "SRV03 - windows server 2016 - 192.168.10.23"
      + id                      = (known after apply)
      + ipv4_addresses          = (known after apply)
      + ipv6_addresses          = (known after apply)
      + keyboard_layout         = "en-us"
      + mac_addresses           = (known after apply)
      + migrate                 = false
      + name                    = "SRV03"
      + network_interface_names = (known after apply)
      + node_name               = "proxmox"
      + on_boot                 = true
      + pool_id                 = "GOAD"
      + protection              = false
      + reboot                  = false
      + scsi_hardware           = "virtio-scsi-pci"
      + started                 = true
      + stop_on_destroy         = false
      + tablet_device           = true
      + template                = false
      + timeout_clone           = 1800
      + timeout_create          = 1800
      + timeout_migrate         = 1800
      + timeout_move_disk       = 1800
      + timeout_reboot          = 1800
      + timeout_shutdown_vm     = 1800
      + timeout_start_vm        = 1800
      + timeout_stop_vm         = 300
      + vm_id                   = (known after apply)

      + agent {
          + enabled = true
          + timeout = "15m"
          + trim    = false
          + type    = "virtio"
        }

      + clone {
          + full    = false
          + retries = 2
          + vm_id   = 103
        }

      + cpu {
          + cores      = 2
          + hotplugged = 0
          + limit      = 0
          + numa       = false
          + sockets    = 1
          + type       = "qemu64"
          + units      = 1024
        }

      + initialization {
          + datastore_id = "local-lvm"
          + upgrade      = (known after apply)

          + dns {
              + servers = [
                  + "192.168.10.1",
                ]
            }

          + ip_config {
              + ipv4 {
                  + address = "192.168.10.23/24"
                  + gateway = "192.168.10.1"
                }
            }
        }

      + memory {
          + dedicated      = 5120
          + floating       = 0
          + keep_hugepages = false
          + shared         = 0
        }

      + network_device {
          + bridge      = "vmbr3"
          + enabled     = true
          + firewall    = false
          + mac_address = (known after apply)
          + model       = "e1000"
          + mtu         = 0
          + queues      = 0
          + rate_limit  = 0
          + vlan_id     = 10
        }

      + operating_system {
          + type = "win10"
        }
    }

Plan: 5 to add, 0 to change, 0 to destroy.
```