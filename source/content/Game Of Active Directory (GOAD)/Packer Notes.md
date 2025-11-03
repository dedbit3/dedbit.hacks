___

> Note: Cloud-Init was used to automatically apply the initial configuration to the VMs upon first boot. Packer was then used to build the final Proxmox image, with Proxmox serving as the build provider. The build_proxmox_iso.sh script present in the GOAD folder was used to create the ISO file with Cloud-init that was used by packer to create the final image.

Packer Commands
---

Initializing Packer:

`packer init . `

Validating Packer Config File:

`packer validate -var-file=windows_server2019_proxmox_cloudinit.pkvars.hcl`

Building Packer Image

`packer build -var-file=windows_server2019_proxmox_cloudinit.pkvars.hcl`


Default packer.pkr.hcl in GOAD folder (packer config file)
---
```powershell
packer {
  required_plugins {
    proxmox = {
      version = ">= 1.1.2"
      source  = "github.com/hashicorp/proxmox"
    }
  }
}

source "proxmox-iso" "windows" {
  additional_iso_files {
    device           = "sata3"
    iso_checksum     = "${var.autounattend_checksum}"
    iso_storage_pool = "local"
    iso_url          = "${var.autounattend_iso}"
    unmount          = true
  }
  additional_iso_files {
    device   = "sata4"
    iso_file = "local:iso/virtio-win.iso"
    unmount  = true
  }
  additional_iso_files {
    device   = "sata5"
    iso_file = "local:iso/scripts_withcloudinit.iso"
    unmount  = true
  }
  cloud_init              = true
  cloud_init_storage_pool = "${var.proxmox_iso_storage}"
  communicator            = "winrm"
  cores                   = "${var.vm_cpu_cores}"
  disks {
    disk_size         = "${var.vm_disk_size}"
    format            = "${var.vm_disk_format}"
    storage_pool      = "${var.proxmox_vm_storage}"
    type              = "sata"
  }
  insecure_skip_tls_verify = "${var.proxmox_skip_tls_verify}"
  iso_file                 = "${var.iso_file}"
  memory                   = "${var.vm_memory}"
  network_adapters {
    bridge = "vmbr3"
    model  = "virtio"
    vlan_tag = "10"
  }
  node                 = "${var.proxmox_node}"
  os                   = "${var.os}"
  password             = "${var.proxmox_password}"
  pool                 = "${var.proxmox_pool}"
  proxmox_url          = "${var.proxmox_url}"
  sockets              = "${var.vm_sockets}"
  template_description = "${var.template_description}"
  template_name        = "${var.vm_name}"
  username             = "${var.proxmox_username}"
  vm_name              = "${var.vm_name}"
  winrm_insecure       = true
  winrm_no_proxy       = true
  winrm_password       = "${var.winrm_password}"
  winrm_timeout        = "120m"
  winrm_use_ssl        = true
  winrm_username       = "${var.winrm_username}"
  task_timeout         = "40m"
}

build {
  sources = ["source.proxmox-iso.windows"]

  provisioner "powershell" {
    elevated_password = "vagrant"
    elevated_user     = "vagrant"
    scripts           = ["${path.root}/scripts/sysprep/cloudbase-init.ps1"]
  }

  provisioner "powershell" {
    elevated_password = "vagrant"
    elevated_user     = "vagrant"
    pause_before      = "1m0s"
    scripts           = ["${path.root}/scripts/sysprep/cloudbase-init-p2.ps1"]
  }

}
```


Machine Configuration Packer File:
---
```powershell
winrm_username        = "vagrant"
winrm_password        = "vagrant"
vm_name               = "WinServer2019x64-cloudinit-qcow2"
template_description  = "Windows Server 2019 64-bit - build 17763.737.190906-2324 - template built with Packer - cloudinit - {{isotime \"2006-01-02 03:04:05\"}}"
iso_file              = "local:iso/windows_server_2019_17763.737_eval_x64.iso"
autounattend_iso      = "./iso/Autounattend_winserver2019_cloudinit.iso"
autounattend_checksum = "sha256:b6b28259f4ed177c654dee1e9a42f7dfbb85b75327f2889d08687a6f44fcbc2b"
vm_cpu_cores          = "2"
vm_memory             = "4096"
vm_disk_size          = "40G"
vm_sockets            = "1"
os                    = "win10"
vm_disk_format	     = "raw"
```